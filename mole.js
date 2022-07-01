function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function gethungryInterval() {
  return date.now() + Math.floor(Math.random() * 3000) + 2000;
}

const moles = [
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-0'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-1'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-2'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-3'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-4'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-5'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-6'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-7'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-8'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-9'),
  },
];

function getNextStatus(mole) {
  switch (mole.status) {
    case 'sad':
      mole.next = getSadInterval();
      mole.status = 'leaving';
      mole.node.src = './Static/mole-leaving.png';
      break;
    case 'leaving':
      mole.next = Date.now() + 1000;
      mole.status = 'gone';
      mole.node.children[0].classList.add('gone');
      break;
    case 'gone':
      mole.status = 'hungry';
      mole.next = gethungryInterval();
      mole.node.children[0].classList.add('hungry');
      mole.node.children[0].classList.remove('gone');
      mole.node.children[0].src = './static/mole-hungry.png';
    case 'hungry':
      mole.status = 'sad';
      mole.next = getSadInterval();
      mole.node.children[0].classList.remove('hungry');
      mole.node.children[0].src = './static/mole-sad.png';
      break;
  }
}

let runAgainAt = Date.now() + 100;

function nextFrame() {
  const now = Date.now();

  if (runAgainAt <= now) {
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = now + 100;
  }

  requestAnimationFrame(nextFrame);
}

nextFrame();
