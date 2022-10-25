interface TabBarChange<
  Detail extends string | number = string | number,
  Mark extends Record<string, any> = Record<string, any>,
  CurrentTargetDataset extends Record<string, any> = Record<string, any>,
  TargetDataset extends Record<string, any> = CurrentTargetDataset
> extends WechatMiniprogram.BaseEvent<Mark, CurrentTargetDataset, TargetDataset> {
  detail: Detail
  touches: undefined
  changedTouches: undefined
}
