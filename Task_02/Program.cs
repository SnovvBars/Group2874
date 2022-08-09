Console.WriteLine("Введите первое число");
double numberA = double.Parse(Console.ReadLine());

Console.WriteLine("Введите второе число");
double numberB = double.Parse(Console.ReadLine());

if (numberA > numberB) 
    Console.WriteLine("Число " + numberA + " больше, чем " + numberB);
else if (numberA < numberB) 
    Console.WriteLine("Число " + numberB + " больше, чем " + numberA);
else if (numberA == numberB) 
    Console.WriteLine("Числа равны");
else 
    Console.WriteLine("Введено не число");