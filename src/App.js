import './App.css';
import Images from './images';
import { useEffect, useState, useRef } from 'react';
// import uniqid from 'uniqid';`

function App() {
  const [view, setView] = useState('active');
  const [score, setScore] = useState(0);
  const [images, setImage] = useState([]);
  const [level, setLevel] = useState(1);
  let  imageLength = useRef(4);
  let count = useRef(0);


  useEffect(() => {
    if (view !== 'active') return;
    const imagesArr = [];
    
    while (imagesArr.length < imageLength.current) {
      let n = Math.floor(Math.random() * Images.length);
      !imagesArr.includes(n) && imagesArr.push(n);
    }

    setImage(imagesArr);
  }, [ view, level ])

  useEffect(() => {
    if (score === 0) return;
    count.current++;
    console.log(count.current);
    console.log(imageLength.current);
    if (count.current === imageLength.current) {
      console.log('equal'
      );
      imageLength.current += 2;
      // setView('false');
      setLevel(l => l + 1);
      // restart();
      count.current = 0;
      return;
    }
    let ar = []
    while (ar.length < imageLength.current) {
      let n = Math.floor(Math.random() * imageLength.current);
      !ar.includes(n) && ar.push(n);
    }
    setImage(pImg => ar.map(n => pImg[n]));
  }, [ score ])


  const restart = e => {
    setView('active');
    imageLength.current = 4;
    setScore(0);
    setLevel(0);

    count.current = 0;
  }

  return (
    <div className="App">
      <div className="content">
        {
          images.map((n, index) =>
            <Card
              key={Images[n].index}
              src={Images[n].src}
              name={Images[n].name}
              setView={setView}
              setScore={setScore}
              view={view}
              level={level}
            />)
        }
      </div>
      {view === 'inactive' && <div className='result'>
        <div>
          <p>Game Over</p>
          <p>Score: {score}</p>
          <button onClick={restart}>Restart</button>
        </div>
      </div>
      }
    </div>
  );
}

function Card(props) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (props.view === 'inactive') return;
    setClicked(false);
  }, [ props.view, props.level ])

  const cardEvent = e => {
    if (clicked === true) {
      props.setView('inactive');
      return;
    }
    setClicked(true);
    props.setScore(prev => prev+1)
  }

  return (
    <div className='card'>
      <button onClick={cardEvent}>
        <img src={props.src} alt='tanjiro' />
        <p>{props.name}</p>
      </button>
    </div>
  )
}

export default App;
