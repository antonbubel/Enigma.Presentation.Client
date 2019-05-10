import { SelectOptionModel } from '@models/select-option.model';

export default (types: any, names: any) =>
  <SelectOptionModel[]>Object.values(types)
    .map((key: number | string) => ({ value: key, name: names[key] }));
