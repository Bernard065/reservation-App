import styled from 'styled-components';

export const Title = styled.h1`
text-align: center;
margin-bottom: 50px;
margin-top: 30px
`;
export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-right: 20px;

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 16px;
    }
  }
`;


export const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const RoomCard = styled.div`
  width: 30%;
  margin-bottom: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  h2 {
    font-size: 24px;
    margin: 20px;
  }

  p {
    margin: 0 20px 20px 20px;
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  }

  button {
    display: block;
    width: 100%;
    padding: 15px;
    background-color: #9b4b96;
    background-image: linear-gradient(to bottom right, #9b4b96, #e39d59);
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 0;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #9c5b89;
      background-image: linear-gradient(to bottom right, #8d3e89, #d98f4f);
    }
  }

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

