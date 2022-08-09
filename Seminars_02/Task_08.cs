Console.WriteLine("Введите целое положительное число:");
int number = int.Parse(Console.ReadLine());

int count = 2;

Console.Clear();

if (number <= 2) Console.WriteLine("Нет четных чисел");
else if (number > 2)   
    {
        while (count < number)
            {   
                Console.Write(count + " ");
                count+=2;
            }
    }
