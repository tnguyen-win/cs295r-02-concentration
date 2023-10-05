import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Status from './components/Status';

const imagePath = 'Cards/';

const fillImages = () => {
    const images = Array(20).fill(null);
    const values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    const suits = ['h', 's'];
    let index = 0;

    for (const value in values) {
        for (const suit in suits) {
            images[index] = `card${values[value]}${suits[suit]}.jpg`;

            index++;
        }
    }

    return images;
};

const shuffleImages = images => {
    for (const i in images) {
        const rnd = Math.floor(Math.random() * images.length);

        [images[i], images[rnd]] = [images[rnd], images[i]];
    }
};

const fillAndShuffle = () => {
    const localImages = fillImages();

    shuffleImages(localImages);

    return localImages;
};

const isMatch = (firstPick, secondPick, images) => images[firstPick].substr(4, 1) === images[secondPick].substr(4, 1);

function App() {
    const [matches, setMatches] = useState(0);
    const [tries, setTries] = useState(0);
    const [images, setImages] = useState(fillAndShuffle);
    const [picks, setPicks] = useState({ first: -1, second: -1 });

    const checkCards = (firstPick, secondPick, images, tries, matches) => {
        const localPicks = { ...picks };

        setTries(tries + 1);

        /* Hack - Game Over */
        // setMatches(10);

        if (isMatch(firstPick, secondPick, images)) {
            setMatches(matches + 1);

            images[firstPick] = null;
            images[secondPick] = null;

            setImages(images);
        }

        localPicks.first = -1;
        localPicks.second = -1;

        setPicks(localPicks);
    };

    const handleClick = event => {
        const index = parseInt(event.target.id);
        const localPicks = { ...picks };
        const localImages = images;

        if (picks.first === -1) localPicks.first = index;
        else {
            localPicks.second = index;

            setTimeout(checkCards, 2000, localPicks.first, localPicks.second, localImages, tries, matches);
            /* Hack - Remove check match delay */
            // setTimeout(checkCards, null, localPicks.first, localPicks.second, localImages, tries, matches);
        }

        setPicks(localPicks);
    };

    const renderCard = i => {
        const enabled = (images[i] !== null && (i !== picks.first && i !== picks.second) && (picks.first === -1 || picks.second === -1) && (matches < 10));
        const image = images[i] === null ? 'none' : picks.first === i || picks.second === i ? `${imagePath}${images[i]}` : `${imagePath}black_back.jpg`;
        /* Hack - Show All */
        // const image = `${imagePath}${images[i]}`;
        const cursor = enabled ? 'pointer' : 'none';
        const style = {
            backgroundImage: `url(${image})`,
            cursor
        };
        const eventHandler = enabled ? handleClick : () => { };

        return <Card index={i} style={style} eventHandler={eventHandler} />;
    };

    const status = matches < 10 ? `Matches: ${matches} Tries: ${tries}` : matches > 1 ? `Congratulations! You found all 10 matches in ${tries} try!` : `Congratulations! You found all 10 matches in ${tries} tries!`;
    return (
        <div className='container mt-5 text-info' id='board'>
            <Status status={status} />
            <div className='row'>
                <div className='col-sm-1'></div>
                {renderCard(0)}
                {renderCard(1)}
                {renderCard(2)}
                {renderCard(3)}
                {renderCard(4)}
                <div className='col-1'></div>
            </div>
            <div className='row'>
                <div className='col-sm-1'></div>
                {renderCard(5)}
                {renderCard(6)}
                {renderCard(7)}
                {renderCard(8)}
                {renderCard(9)}
                <div className='col-1'></div>
            </div>
            <div className='row'>
                <div className='col-sm-1'></div>
                {renderCard(10)}
                {renderCard(11)}
                {renderCard(12)}
                {renderCard(13)}
                {renderCard(14)}
                <div className='col-1'></div>
            </div>
            <div className='row'>
                <div className='col-sm-1'></div>
                {renderCard(15)}
                {renderCard(16)}
                {renderCard(17)}
                {renderCard(18)}
                {renderCard(19)}
                <div className='col-1'></div>
            </div>
        </div>
    );
}

export default App;
