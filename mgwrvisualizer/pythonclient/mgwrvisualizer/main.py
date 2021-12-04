"""Entrypoint to MGWRVisualizer"""

import json
from pathlib import Path
from typing import Any
from typing import Dict
from typing import List
from typing import Optional
from typing import Union
import warnings

import pandas as pd  # type: ignore

from data_extractors import extract_covariates
from data_extractors import extract_diagnostics
from data_extractors import extract_geojson
from data_extractors import extract_model_info
from data_extractors import extract_paramters
from data_extractors import extract_spatial_weights

# from mgwrvisualizer.utils import detect_shared_columns
from utils import detect_shared_columns


# "EPSG:6345"


class MGWRVisualizer:
    def __init__(
        self,
        mgwr_results,
        attribute_df: pd.DataFrame,
        geo_df: Optional[pd.DataFrame] = None,
        merge_key: Optional[str] = None,
        crs: Optional[str] = None,
    ) -> None:

        ##
        # Validate MGWR Model
        ##
        # if not isinstance(mgwr_results, "MGWR"):
        #     ...
        # raise ValueError("`mgwr_results` must be a MGWR object")

        # Validate dataframes
        if not isinstance(attribute_df, pd.DataFrame):
            raise ValueError("`attribute_df` must be a Pandas DataFrame")

        if "geometry" in attribute_df.columns and geo_df is None:
            warnings.warn(
                "Using detected geometry in `attribute_df`",
                UserWarning,
                stacklevel=0,
            )
            self.geo_df = attribute_df
        elif (
            attribute_df is not None
            and geo_df is not None
            and "geometry" in attribute_df.columns
        ):
            warnings.warn(
                "Geometry exists in `attribute_df` - defaulting to given `geo_df`",
                UserWarning,
                stacklevel=0,
            )
            self.geo_df = geo_df
        elif not isinstance(geo_df, pd.DataFrame):
            raise ValueError("`geo_df` must be given as a GeoPandas DataFrame")
        else:
            self.geo_df = geo_df

        ##
        # Validate CRS
        ##
        self.crs: str
        if crs is None and self.geo_df.crs is None:
            raise ValueError(
                "`crs` does not exist on `geo_df`, it must be passed manually"
            )

        if crs is not None and self.geo_df.crs is not None and crs != self.geo_df.crs:
            warnings.warn(
                "Given `crs` differs from `geo_df.crs` - defaulting to given `crs`",
                UserWarning,
                stacklevel=0,
            )
            self.crs = crs
        elif crs is not None:
            self.crs = crs
        else:
            self.crs = self.geo_df.crs

        ##
        # If required, validate `merge_key`
        ##
        self.merge_key: Optional[str] = None
        if geo_df is not None and attribute_df is not None:
            shared_columns: Optional[List[str]] = detect_shared_columns(
                geo_df, attribute_df
            )

            if not shared_columns:
                raise ValueError("`geo_df` and `attribute_df` must share columns")

            if merge_key and merge_key in shared_columns:
                self.merge_key = merge_key
            else:
                warnings.warn(
                    "`merge_key` not given - autodecting...",
                    UserWarning,
                    stacklevel=0,
                )

                if len(shared_columns) > 1:
                    raise ValueError(
                        "Unable to auto-detect `merge_key`, it must be passed manually"
                    )

                self.merge_key = shared_columns[0]

        self.mgwr_results = mgwr_results
        self.attribute_df = attribute_df

    def process(self) -> None:

        extractors: dict = {
            "covariates": extract_covariates,
            "diagnosticInfo": extract_diagnostics,
            "modelResults": extract_model_info,
            "parameters": extract_paramters,
            "W": extract_spatial_weights,
        }

        processed_results: Dict[str, Any] = {}

        for name, func in extractors.items():
            processed_results[name] = func(self.mgwr_results)

        processed_results["geojson"] = extract_geojson(
            self.geo_df, self.attribute_df, merge_key=self.merge_key, crs=self.crs
        )

        self.processed_results = processed_results

        return None

    def save_results(self, file: Union[Path, str]) -> None:

        if not hasattr(self, "processed_results"):
            raise ValueError("You must `process` results before you can save them")

        file_path: Path = file if isinstance(file, Path) else Path(file)

        if file_path.is_file():
            user_input: str = input("File exists - overwrite? Y/N").upper().strip()

            if user_input == "N":
                return None
        if file_path.suffix != ".json":
            file_path = Path(str(file_path) + ".json")

        with open(str(file_path), "w") as outfile:
            json.dump(self.processed_results, outfile, indent=4)

        return None

    def run(self) -> None:

        if not hasattr(self, "processed_results"):
            self.process()

        print("RUNNING SERVER")

        return None
