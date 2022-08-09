Console.WriteLine("Введите первое число");
int.numberA = int.Parse(Console.ReadLine());

Console.WriteLine("Введите второе число");
int.numberB = int.Parse(Console.ReadLine());

if (numberA > numberB) 
    Console.WriteLine("Число " + numberA + " больше, чем " + numberB);
else if (numberA < numberB) 
    Console.WriteLine("Число " + numberB + " больше, чем " + numberA);
else if (numberA == numberB) 
    Console.WriteLine("Числа равны");
else 
    Console.WriteLine("Введено не число");
