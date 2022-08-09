Console.WriteLine("Введите первое число");
int numberA = int.Parse(Console.ReadLine());

Console.WriteLine("Введите второе число");
int numberB = int.Parse(Console.ReadLine());

Console.WriteLine("Введите третье число");
int numberC = int.Parse(Console.ReadLine());

int max = numberA;

if (numberB >= max)
    max = numberB;
if (numberC >= max)
    max = numberC;

Console.WriteLine("Максимальное значение из 3-х чисел равно " + max);
