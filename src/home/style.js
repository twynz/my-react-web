import styled from 'styled-components';

export const HomeWrapper = styled.div`
`;

export const ArticleWrapper = styled.div`

`;

export const LoadMoreButton = styled.button`
  
`;

export const ListItem = styled.div`
	overflow: hidden;
	padding: 20px 0;
	border-bottom: 1px solid #dcdcdc;
	.pic {
		display: block;
		width: 125px;
		height: 100px;
		float: right;
		border-radius: 10px;
	}
`;

export const ListInfo =	styled.div`
	width: 500px;
	float: left;
	.title {
		line-height: 27px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.desc {
		line-height: 24px;
		font-size: 13px;
		color: #999;
	}
`;

export const DetailWrapper = styled.div`
	overflow: hidden;
	width: 620px;
	margin: 0 auto;
	padding-bottom: 100px;
`;

export const Header = styled.div`
	margin: 50px 0 20px 0;
	line-height: 44px;
	font-size: 34px;
	color: #333;
	font-weight: bold;
`;

export const Content = styled.div`
	color: ##2f2f2f;
	img {
		width: 100%;
	}
	p {
		margin: 25px 0;
		font-size: 16px;
		line-height: 30px;
	}
	b {
		font-weight: bold;
	}
`;