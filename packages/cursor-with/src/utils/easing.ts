import type { EasingInput } from '../types';

// every easing function is from https://easings.net
function linear(t: number) {
  return t;
}
function easeIn(t: number) {
  return t ** 3;
}
function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}
function easeInOut(t: number) {
  if (t < 0.5) {
    return 4 * (t ** 3);
  }
  return 1 - ((-2 * t + 2) ** 3) / 2;
}

function backIn(t: number, s = 2.3) {
  return t * t * ((s + 1) * t - s);
}
function backOut(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}
function backInOut(t: number, s = 2.3) {
  const k = s * 1.525;
  if (t < 0.5) {
    const u = 2 * t;
    return (u * u * ((k + 1) * u - k)) / 2;
  }
  const u = 2 * t - 2;
  return (u * u * ((k + 1) * u + k) + 2) / 2;
}

function elasticOut(t: number, amplitude = 1, period = 0.3) {
  if (t === 0) {
    return 0;
  }
  if (t === 1) {
    return 1;
  }
  const c = (2 * Math.PI) / period;
  return amplitude * (2 ** (-10 * t)) * Math.sin((t - period / 4) * c) + 1;
}
function elasticIn(t: number, amplitude = 1, period = 0.3) {
  return 1 - elasticOut(1 - t, amplitude, period);
}
function elasticInOut(t: number, amplitude = 1, period = 0.45) {
  if (t === 0) {
    return 0;
  }
  if (t === 1) {
    return 1;
  }
  const c = (2 * Math.PI) / period;
  if (t < 0.5) {
    const u = 2 * t - 1;
    return -0.5 * amplitude * (2 ** (10 * u)) * Math.sin((u - period / 4) * c);
  }
  const u = 2 * t - 1;
  return amplitude * (2 ** (-10 * u)) * Math.sin((u - period / 4) * c) * 0.5 + 1;
}

function bounceOut(t: number) {
  const x = easeOut(t);
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  }
  if (x < 2 / d1) {
    const y = x - 1.5 / d1;
    return n1 * y * y + 0.75;
  }
  if (x < 2.5 / d1) {
    const y = x - 2.25 / d1;
    return n1 * y * y + 0.9375;
  }
  const y = x - 2.625 / d1;
  return n1 * y * y + 0.984375;
}
function bounceIn(t: number) {
  return 1 - bounceOut(1 - t);
}
function bounceInOut(t: number) {
  if (t < 0.5) {
    return (1 - bounceOut(1 - 2 * t)) / 2;
  }
  return (bounceOut(2 * t - 1) + 1) / 2;
}
function sineIn(t: number) {
  return 1 - Math.cos((t * Math.PI) / 2);
}
function sineOut(t: number) {
  return Math.sin((t * Math.PI) / 2);
}
function sineInOut(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}
function quadIn(t: number) {
  return t * t;
}
function quadOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}
function quadInOut(t: number) {
  if (t < 0.5) {
    return 2 * t * t;
  }
  return 1 - ((-2 * t + 2) ** 2) / 2;
}
function quartIn(t: number) {
  return t ** 4;
}
function quartOut(t: number) {
  return 1 - (1 - t) ** 4;
}
function quartInOut(t: number) {
  if (t < 0.5) {
    return 8 * (t ** 4);
  }
  return 1 - ((-2 * t + 2) ** 4) / 2;
}
function quintIn(t: number) {
  return t ** 5;
}
function quintOut(t: number) {
  return 1 - (1 - t) ** 5;
}
function quintInOut(t: number) {
  if (t < 0.5) {
    return 16 * (t ** 5);
  }
  return 1 - ((-2 * t + 2) ** 5) / 2;
}
function expoIn(t: number) {
  if (t === 0) {
    return 0;
  }
  return 2 ** (10 * t - 10);
}
function expoOut(t: number) {
  if (t === 1) {
    return 1;
  }
  return 1 - 2 ** (-10 * t);
}
function expoInOut(t: number) {
  if (t === 0) {
    return 0;
  }
  if (t === 1) {
    return 1;
  }
  if (t < 0.5) {
    return (2 ** (20 * t - 10)) / 2;
  }
  return (2 - 2 ** (-20 * t + 10)) / 2;
}
function circIn(t: number) {
  return 1 - Math.sqrt(1 - t * t);
}
function circOut(t: number) {
  return Math.sqrt(1 - (t - 1) * (t - 1));
}
function circInOut(t: number) {
  if (t < 0.5) {
    const u = 2 * t;
    return (1 - Math.sqrt(1 - u * u)) / 2;
  }
  const u = -2 * t + 2;
  return (Math.sqrt(1 - u * u) + 1) / 2;
}
function springOut(t: number, frequency = 5, damping = 0.12) {
  if (t === 0) {
    return 0;
  }
  if (t === 1) {
    return 1;
  }
  const envelope = Math.exp(-damping * t);
  const oscillation = Math.sin(Math.PI * frequency * t);
  return 1 - envelope * (1 - t) * oscillation;
}
function springIn(t: number, frequency = 5, damping = 0.12) {
  return 1 - springOut(1 - t, frequency, damping);
}
function springInOut(t: number, frequency = 5, damping = 0.12) {
  if (t < 0.5) {
    return springIn(2 * t, frequency, damping) * 0.5;
  }
  return springOut(2 * t - 1, frequency, damping) * 0.5 + 0.5;
}
export function resolveEasing(easing?: EasingInput): (t: number) => number {
  if (!easing) {
    return linear;
  }
  if (typeof easing === 'string') {
    switch (easing) {
      case 'linear':
        return linear;
      case 'ease-in':
        return easeIn;
      case 'ease-out':
        return easeOut;
      case 'ease-in-out':
        return easeInOut;
      case 'sine-in':
        return sineIn;
      case 'sine-out':
        return sineOut;
      case 'sine-in-out':
        return sineInOut;
      case 'quad-in':
        return quadIn;
      case 'quad-out':
        return quadOut;
      case 'quad-in-out':
        return quadInOut;
      case 'quart-in':
        return quartIn;
      case 'quart-out':
        return quartOut;
      case 'quart-in-out':
        return quartInOut;
      case 'quint-in':
        return quintIn;
      case 'quint-out':
        return quintOut;
      case 'quint-in-out':
        return quintInOut;
      case 'expo-in':
        return expoIn;
      case 'expo-out':
        return expoOut;
      case 'expo-in-out':
        return expoInOut;
      case 'circ-in':
        return circIn;
      case 'circ-out':
        return circOut;
      case 'circ-in-out':
        return circInOut;
      case 'back-in':
        return (t: number) => backIn(t);
      case 'back-out':
        return (t: number) => backOut(t);
      case 'back-in-out':
        return (t: number) => backInOut(t);
      case 'elastic-in':
        return (t: number) => elasticIn(t);
      case 'elastic-out':
        return (t: number) => elasticOut(t);
      case 'elastic-in-out':
        return (t: number) => elasticInOut(t);
      case 'bounce-in':
        return (t: number) => bounceIn(t);
      case 'bounce-out':
        return (t: number) => bounceOut(t);
      case 'bounce-in-out':
        return (t: number) => bounceInOut(t);
      case 'spring-in':
        return (t: number) => springIn(t);
      case 'spring-out':
        return (t: number) => springOut(t);
      case 'spring-in-out':
        return (t: number) => springInOut(t);
      default:
        return linear;
    }
  }
  if (typeof easing !== 'string') {
    return easing;
  }
  return linear;
}
