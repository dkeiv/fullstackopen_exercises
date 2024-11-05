interface BmiValues {
  height: number;
  weight: number;
}

function calculateBMI(height: number, weight: number): string {
  const bmi = weight ** 2 / height;

  if (height <= 0) throw new Error('height is less than 0');
  if (weight <= 0) throw new Error('weight is less than 0');

  if (0 <= bmi && bmi <= 18.4) return 'Underweight';
  else if (18.5 <= bmi && bmi <= 24.9) return 'Normal range';
  else return 'Overweightp';
}

function parseArguments(args: string[]): BmiValues {
  console.log(args.length);
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBMI(height, weight));
} catch (err: unknown) {
  let errMsg = 'Something wrong! ';
  if (err instanceof Error) errMsg += err.message;

  console.error(errMsg);
}
