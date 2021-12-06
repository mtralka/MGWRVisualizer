from typing import List
from typing import Optional
from typing import Set

import pandas as pd


def detect_shared_columns(df1: pd.DataFrame, df2: pd.DataFrame) -> Optional[List[str]]:

    df1_cols: Set[str] = set(df1.columns)
    df2_cols: Set[str] = set(df2.columns)

    if not bool(df1_cols & df2_cols):
        return None

    return list(df1_cols & df2_cols)
