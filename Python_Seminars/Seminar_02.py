# Задача 1:
# Напишите программу, которая принимает на вход вещественное число и показывает сумму его цифр.
# Пример:
# - 6782 -> 23
# - 0,56 -> 11

# Решение

def digit_check(text_invitation):             # Проверка ввода
    success_input = True
    while success_input:
        try:
            num = float(input(text_invitation)) 
            success_input = False
        except:
            print("\nВведите корректное число!\n")
    return num

number = digit_check("\nВведите число: ")

sum = 0
for i in str(number):
    if i not in (',', '.', '-'):
        sum += int(i); 

print('Сумма всех цифр в числе {} равна {} \n'.format(number, sum)) 

# =============================================================

# Задача 2
# Напишите программу, которая принимает на вход число N и выдает набор произведений чисел от 1 до N.
# Пример:
# - пусть N = 4, тогда [ 1, 2, 6, 24 ] (1, 1*2, 1*2*3, 1*2*3*4)

# Решение

def digit_check(text_invitation):   # Проверка ввода
    success_input = True
    while success_input:
        try:
            num = int(input(text_invitation))
            if num > 0: 
                success_input = False
        except:
            print("\nВведите корректное число!\n")
    return num

def num_comp(num):                # рекурсивный вызов функции
    if num == 1:
        return num   
    return num_comp(num - 1) * num

number = digit_check("\nВведите целое положительное число: ")
lst = []
for i in range(1, number + 1):
    lst.append(num_comp(i))
print ('\n {} -> {}\n'.format(number, lst))

# =====================================================================

# Задача 3
# Задайте список из n чисел, заполненный по формуле (1 + 1/n) ** n и вы ведите на экран их сумму
# Пример:    
# - Для n = 6: [2, 2, 2, 2, 2, 3] -> 13  насколько я понял, это округление до целых?

# Решение

def digit_check(text_invitation):   # Проверка ввода
    success_input = True
    while success_input:
        try:
            num = int(input(text_invitation))
            if num > 0: 
                success_input = False
        except:
            print("\nВведите корректное число!\n")
    return num

def f_culc(num):
    summ = 1
    for _ in range(num):
        summ *= (1 + 1/num)
    return summ

number = digit_check("\nВведите целое положительное число: ")
lst = []
summ_lst = 0
for i in range(1, number + 1):
    lst.append(int(round(f_culc(i))))
    summ_lst += lst[i-1]
print ('\nСумма списка из {} элементов равна: {}\n'.format(number, summ_lst))

# =================================================================

# Задача 4
# Напишите программу, которая принимает на вход два числа. Задайте список из N элементов, заполненных 
# числами из промежутка [-N, N]. Найдите произведение элементов на указанных позициях (не индексах)

# Решение

def digit_check(text_invitation):   # Проверка ввода
    success_input = True
    while success_input:
        try:
            num = int(input(text_invitation))
            if num > 0: 
                success_input = False
        except:
            print("\nВведите корректное число!\n")
    return num

number_a = digit_check("\nPosition one: ")
number_b = digit_check("\nPosition two: ")

with open('file.txt', 'w') as data:             # Сохраняем значения в файл
    data.write(str(number_a) + '\n')
    data.write(str(number_b))
data.close()

n = digit_check("\nNumber of element: ")

while n < int(number_a / 2) or n < int(number_b / 2):   # Проверка диапазона
    print ("Количество элементов не может быть меньше половины максимального значения позиции!!\nПопробуйте снова!")
    n = digit_check("\nNumber of element: ")

lst = []
for i in range(-n, n+1):
    lst.append(i)
print("\n", lst, "\n")
print("Произведение {} и {} элементов равно: {}\n".format(number_a, number_b, lst[number_a - 1]*lst[number_b - 1]))

# ====================================================

# Задача 5
# Реализуйте алгоритм перемешивания списка

# Решение
# Алгоритм. Созжаем список из N элементов, затем создаем список из случайных неповторяющихся чисел
# от 0 до N, это индексы эдеменьов изначального списка.

from random import randint   # Импорт генератора случайных чисел

def digit_check(text_invitation):       # проверка ввода
    success_input = True
    while success_input:
        try:
            num = int(input(text_invitation))
            if num > 0: 
                success_input = False
        except:
            print("\nВведите корректное число!\n")
    return num


def fill_list(n):                   # Заполнение списка
    lst = []
    for i in range(n):
        lst.append(i)
    return lst

def rnd_index(n):                   # создание списка случайных уникальных чисел от 0 до N
    index_list = []
    for i in range(n):
        rnd_tmp = randint (0, n - 1)    # генерируем случайное число
        while rnd_tmp in index_list:    # если это число уже есть в списке, генерируем снова
            rnd_tmp = randint (0, n - 1)
        index_list.append(rnd_tmp)      # если нет, вставляем в список
    return index_list

n = digit_check("\nNumber of element: ")    # Ввод числа

list_num = fill_list(n)                     # Заполнение первичного списка
print('\nИсходный список\n{}'.format(list_num))

new_list = []
for i in rnd_index(n):
    new_list.append(list_num[i])        # Индексы из списка случайных чисел, значения из перврначального
print('\nПеремешанный список\n{}\n'.format(new_list))
