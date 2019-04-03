import styled from 'styled-components';
import logoPic from '../../statics/logo.png';

export const HeaderWrapper = styled.div`
    height: 56px;
    border-bottom: solid 1px gray;
    margin: 0px;
    
`;

export const Logo = styled.div`
	top: 0;
	left: 0;
	width: 100px;
	height: 56px;
	background: url(${logoPic});
	background-size: 100px 56px;
    position: absolute;
    margin-right: 1px;
`;

export const Nav = styled.div`
    padding-right: 10px;
    width: 960px;
    margin-left:100px;
    box-sizing: border-box;
    
`;

export const NavItem = styled.div`
  //font-family: "Apple LiSung";
  padding: 0px 15px;
  line-height: 56px;
  color: #333;
  cursor: pointer;
  &.right{
  float: right;
  }
  &.left{
  float: left;
  }
  &.hover{
  background-color:gray;
  }
  &.login {
  font-weight: bold;
  color:red;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  float: left;
  z-index:1;
`;

export const Navsearch = styled.input.attrs({placeholder: 'search'})`
  border-radius: 21px;
  height: 20px;
  color: #666;
  margin-top: 16px;
  background: #eee;
  outline: none;
  &.default{
    width:160px;
  }
  &.expand{
    width:240px;
  }
`;

export const SearchInfo = styled.div`
  width:240px;
  border: 1px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, .2);
`;

export const SearchInfoList = styled.div`
  width:180px;
  height:60px;
`;

export const SearchInfoItem = styled.div`
  float: left;
  border: 1px solid;
  color: #787878;
  margin-right: 8px;
  margin-left:8px;
  margin-bottom: 15px;
  border-radius: 3px;
  font-size: 12px;
  ling-height: 13px;
`;

export const Button = styled.button`
  float: right;
  margin-top: 9px;
  margin-right: 20px;
  padding: 0 20px;
  line-height: 38px;
  border-radius: 19px;
  border: 1px solid #ec6149;
  font-size: 14px;
  &.writting {
	color: #fff;
	background: #ec6149;
  }
`;