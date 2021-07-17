
import styled from 'styled-components';
import RoomIcon from '@material-ui/icons/Room';

const MarkerDiv = styled.div`
  text-align: center;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const Marker = () => (
  <MarkerDiv>
    <RoomIcon fontSize="large" color="error" />
  </MarkerDiv>
)

export default Marker;