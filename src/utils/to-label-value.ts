export const toLabelValue = (
  array: any[],
  labelProp: string,
  valueProp: string,
  valueInLabel?: boolean,
) =>
  array?.map(
    (item) =>
      ({
        label: valueInLabel
          ? `${item[valueProp]} - ${item[labelProp]}`
          : item[labelProp],
        value: item[valueProp],
      } || []),
  )
