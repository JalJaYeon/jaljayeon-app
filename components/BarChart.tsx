import React from 'react';
import {ViewStyle} from 'react-native';
import {BarChart as RNBarChart, Grid} from 'react-native-svg-charts';
import {BLUE} from 'utils/color';

interface Props {
  data: number[];
  style: ViewStyle;
  contentInset?: any;
}

const BarChart: React.FC<Props> = (props: Props) => {
  const fill = BLUE;

  return (
    <RNBarChart
      style={props.style}
      data={props.data}
      svg={{fill}}
      contentInset={props.contentInset}
      spacingInner={0.4}
      animationDuration={200}
      yMin={0}
      yMax={16}
      animate>
      <Grid />
    </RNBarChart>
  );
};

export default BarChart;
