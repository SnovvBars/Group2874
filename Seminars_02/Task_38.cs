// Задача 38: Задайте массив вещественных чисел. 
// Найдите разницу между максимальным и минимальным элементов массива.
// [3 7 22 2 78] -> 76

// Определение методов

double[] fillArray(int size)                                        // Метод, заполняющий массив случайными вещественными!!! числами
{                        
double[] array = new double[size];                                  // от -100 до 100      
    int rndSign = 0;
    Console.WriteLine("\r\nМассив:");                               // Печатаем слово Массив
    for (int i = 0; i < size; i++)
    {
        rndSign = new Random().Next(0, 2);                          // получаем случайное число 0 или 1  
        array[i] = new Random().NextDouble() * 100;                 // Генерируем элемент массива
        if (rndSign == 0) array[i] = Math.Round(array[i], 2)*(-1);  // если rndSign = 0, элемент массива < 0
        else array[i] = Math.Round(array[i], 2);                    // если rndSign = 1, просто округляем до сотых
        Console.Write(array[i] + " ");                              // Печатаем его
    }
    Console.WriteLine("");
    return array;                                                   // Вернули массив
}

double[] findMinMax(double[] array)                                 // Метод возвращает массив из min и max
{                                                                   // Заодно выводит мин и макс
    double[] sendArray = new double[2];
    sendArray[0] = array[0];                                        // min
    sendArray[1] = array[0];                                        // max
    for (int i = 0; i < array.Length; i++)
    {
        if (array[i] < sendArray[0]) sendArray[0] = array[i];
        if (array[i] > sendArray[1]) sendArray[1] = array[i];
    }
    Console.WriteLine("\r\nМинимальное значение равно: " + sendArray[0] + "\r\nМаксимальное значение равно: " + sendArray[1] + "\r\n");
    return (sendArray);
}

double diffMinMax(double[] array)                                 // Метод возвращает разницу двух 
{                                                                 // элементов массива
    return array[1] - array[0];
}

// Тело программы

Console.WriteLine("Введите размерность массива.");
int sizeArray = int.Parse(Console.ReadLine());

if (sizeArray == 0)                                             // Если введен нулевой или единичный размер массива, заканчиваем.
    Console.WriteLine("\r\nКоличество элементов должно быть больше 0. Попробуйте еще раз\r\n");
else                                                            // Иначе вызываем по порядку метод создания массива,
{                                                               // метод поиска минимального и максимального чисел
                                                                // и разницы между ними
    double[] arrayMinMax = fillArray(sizeArray);                // Создали массив заданного размера
    double[] minMax = findMinMax(arrayMinMax);                  // В массив minMax записали мин и макс
    Console.WriteLine("Разница между максимальным и минимальным значениями равна: " + diffMinMax(minMax) + "\n");   // Вызвали метод diffMinMax разница между мин и макс значениями
}
