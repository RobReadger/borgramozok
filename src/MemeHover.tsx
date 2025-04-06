import {useState} from 'react';
import meme from './assets/meme.jpg';

function HoverImageTooltip() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{padding: '40px'}}>
      <span
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{cursor: 'pointer'}}
      >
        Borgramozók
      </span>
            {isHovered && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#fff',
                        border: '1px solid #ccc',
                        padding: '5px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                        zIndex: 9999
                    }}
                >
                    <img
                        src={meme}
                        alt="Tooltip"
                        style={{width: '100%', height: 'auto'}}
                    />
                </div>
            )}
        </div>
    );
}

export default HoverImageTooltip;
