// Задача 34: Задайте массив заполненный случайными положительными
// трёхзначными числами. Напишите программу, которая покажет количество чётных чисел в массиве.
// [345, 897, 568, 234] -> 2


// Определение методов

int[] fillArray(int size)              // Метод, заполняющий массив случайными числами от 100 1000
{
    int[] array = new int[size];
    Console.WriteLine("\r\nМассив:");               // Печатаем слово Массив
    for (int i = 0; i < size; i++)
    {
        array[i] = new Random().Next(100, 1001);     // Генерируем элемент массива
        Console.Write(array[i] + " ");              // Печатаем его
    }
    Console.WriteLine("");
    return array;                                   // Вернули массив
}

void countEven(int[] array)                         // Метод подсчета четных
{
    int count = 0;                                  // Вводим счетчик четных
    for (int i = 0; i < array.Length; i++)
    {
        if (array[i] % 2 == 0)
            count++;
    }
    if (count == 0)
        Console.WriteLine("Четных не найдено");
    else
        Console.WriteLine("Число четных элементов в массиве равно: " + count);
    return;
}

// Тело программы

Console.WriteLine("Введите размерность массива");
int sizeArray = int.Parse(Console.ReadLine());
if (sizeArray == 0)                              // Если введен нулевой размер массива
    Console.WriteLine("Введен нулевой размр масссива. Попробуйте еще раз");
else                                        // Иначе вызываем по порядку метод создания массива
{                                           // и метод подсчета числа четных чисел
    int[] arrayEvents = fillArray(sizeArray);
    countEven(arrayEvents);
}
