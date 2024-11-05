export interface BmiValues {
  height: number;
  weight: number;
}

export function calculateBMI(height: number, weight: number): string {
  if (height <= 0) throw new Error('height is less than 0');
  if (weight <= 0) throw new Error('weight is less than 0');

  const bmi = weight ** 2 / height;
  if (0 <= bmi && bmi <= 18.4) return 'Underweight';
  else if (bmi <= 24.9) return 'Normal range';
  else return 'Overweight';
}

export function parseArguments(args: Array<string | undefined>): BmiValues {
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

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBMI(height, weight));
  } catch (err: unknown) {
    let errMsg = 'Something wrong! ';
    if (err instanceof Error) errMsg += err.message;

    console.error(errMsg);
  }
}
