import json
from typing import Any, Optional
from typing import Dict
from typing import List
from typing import Union
from typing import cast

import numpy as np
import pandas as pd  # type: ignore


def extract_geojson(
    geodataframe,
    dataframe: pd.DataFrame,
    merge_key: Optional[str],
    crs: str,
) -> Any:
    geodataframe["UID"] = geodataframe.index
    gdf = geodataframe.merge(dataframe, on=merge_key)
    gdf = gdf.set_crs(crs)
    gdf = gdf.to_crs("EPSG:4326")
    return json.loads(gdf.to_json())


def extract_covariates(
    mgwr_results,
) -> Dict[str, Union[int, float, Dict[str, Union[int, float]]]]:
    covariates_dict: Dict[str, Union[int, float, dict]] = {}

    for j in range(mgwr_results.k):
        covariate: Dict[str, Union[int, float]] = {
            "Bandwith": mgwr_results.model.bws[j],
            "ENP_j": mgwr_results.ENP_j[j],
            "Adj t-val": mgwr_results.critical_tval()[j],
            "Adj alpha": mgwr_results.adj_alpha_j[j, 1],
            "Mean": np.mean(mgwr_results.params[:, j]),
            "STD": np.std(mgwr_results.params[:, j]),
            "Min": np.min(mgwr_results.params[:, j]),
            "Median": np.median(mgwr_results.params[:, j]),
            "Max": np.max(mgwr_results.params[:, j]),
        }
        covariates_dict[f"K{j}"] = covariate
    return covariates_dict


def extract_diagnostics(mgwr_results) -> Dict[str, Union[int, float]]:
    diagnostic_dict: Dict[str, Union[int, float]] = {
        "Residual sum of squares": mgwr_results.resid_ss,
        "Effective number of parameters (trace(S))": mgwr_results.tr_S,
        "Degree of freedom (n - trace(S))": mgwr_results.df_model,
        "Sigma estimate": np.sqrt(mgwr_results.sigma2),
        "Log-likelihood": mgwr_results.llf,
        "AIC": mgwr_results.aic,
        "AICc": mgwr_results.aicc,
        "BIC": mgwr_results.bic,
        "R2 ": mgwr_results.R2,
        "Adjusted R2 ": mgwr_results.adj_R2,
    }
    return diagnostic_dict


def extract_model_info(mgwr_results) -> Dict[str, Union[int, float, str]]:
    model_dict: Dict[str, Union[int, float, str]] = {
        "Criterion for optimal bandwidth": mgwr_results.model.selector.criterion,
        "Termination criterion for MGWR": mgwr_results.model.selector.tol_multi,
    }

    model_dict["Spatial kernel"] = (
        mgwr_results.model.kernel
        if mgwr_results.model.fixed
        else mgwr_results.model.kernel
    )

    model_dict["Score of Change (SOC) type"] = cast(
        str, ("RSS" if mgwr_results.model.selector.rss_score else "Smoothing f")
    )

    return model_dict


def extract_spatial_weights(mgwr_results) -> Dict[str, Any]:

    KN: str = "{"

    for K, matrix in enumerate(mgwr_results.W):
        df = pd.DataFrame()
        for n, matrix in enumerate(mgwr_results.W[K]):
            df[f"{n}"] = matrix.astype(float)
        if K != 0:
            KN = KN + ","
        KN = KN + '"K' + str(K) + '":' + df.to_json()

    KN = KN + "}"

    return json.loads(KN)


def extract_paramters(mgwr_results) -> Dict[str, Any]:

    critical: Union[int, float] = mgwr_results.critical_tval()[0]
    params_dict: Dict[str, Union[int, float, list]] = {}
    for idx, col in enumerate(mgwr_results.params.T):

        parameter: List[Union[int, float]] = col.tolist()
        ctvals: List[Union[int, float]] = mgwr_results.filter_tvals()[:, idx].tolist()
        bse: List[Union[int, float]] = mgwr_results.bse[:, idx].tolist()

        sorted_parameter = sorted(parameter)
        error: List[Union[int, float]] = [
            x * critical for _, x in sorted(zip(parameter, bse))
        ]
        ct = [x for _, x in sorted(zip(parameter, ctvals))]

        col_list: List[Dict[str, Any]] = []

        for x_val, data in enumerate(zip(sorted_parameter, error, ct)):
            y_val, error_val, crit_t_val = data
            col_list.append(
                {"y": y_val, "error": error_val, "ctval": crit_t_val, "x": x_val}
            )
        params_dict[f"K{idx}"] = col_list

    params_dict["critical"] = mgwr_results.critical_tval()[0]

    return params_dict
