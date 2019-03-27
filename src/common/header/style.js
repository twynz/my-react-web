import styled from 'styled-components';
import logoPic from '../../statics/logo.png';

export const HeaderWrapper = styled.div`
    height:56px;
    border-bottom: solid 1px gray;
`;

export const Logo = styled.div`
    background: url(${logoPic});
    width: 100px;
	height: 56px;
`;

export const Nav = styled.div`

`;

export const NavItem = styled.div`
  //font-family: "Apple LiSung";
  float:left;
  margin: 0px 15px;
  height:56px;
  line-height: 56px;
`;