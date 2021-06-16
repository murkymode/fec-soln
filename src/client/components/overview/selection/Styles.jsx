import React, { useContext } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AppContext } from '../../../contexts';

export default function Styles () {
  const { styles, selectedStyle, setSelectedStyle, selectedPhoto } = useContext(AppContext);

  return (
    <div>
      <h3>Style {'>'} {styles[selectedStyle].name}</h3>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {styles.map((style, index) => {
          const isSelected = index === selectedStyle;
          return (
            <div key={style.style_id} style={{ width: '25%' }} onClick={() => {
              setSelectedStyle(index);
            }}>
              {isSelected && <FaCheckCircle style={{
                position: 'absolute',
                marginLeft: '50px',
                marginTop: '15px'
              }} />}

              <img src={style.photos[isSelected ? selectedPhoto : 0].thumbnail_url} style={{
                margin: '1em',
                width: '3em',
                height: '3em',
                borderRadius: '50%',
                border: '1px solid black'
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}