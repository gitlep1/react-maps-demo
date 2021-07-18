
import styled from 'styled-components';
import RoomIcon from '@material-ui/icons/Room';
import { Tooltip } from '@material-ui/core';
import WeekendIcon from '@material-ui/icons/Weekend';

const MarkerDiv = styled.div`
  text-align: center;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const Marker = ({address}) => (
  <Tooltip title={address} placement="top">
    <MarkerDiv>
      <WeekendIcon fontSize="large" color="error" />
    </MarkerDiv>
  </Tooltip>
)

export default Marker;