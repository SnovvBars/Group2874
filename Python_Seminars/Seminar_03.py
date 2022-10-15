# Задача 1

# Задайте список из нескольких чисел. Напишите программу, которая найдёт сумму элементов списка,
# стоящих на нечётной позиции.
# Пример:
# - [2, 3, 5, 9, 3] -> на нечётных позициях элементы 3 и 9, ответ: 12

# Решение
from random import randint

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

def random_fill(number):    # Заполнение случайными числами
    for i in range(0, number):
        mass[i] = randint(0, number)
        mass.append(mass[i])
    return mass

def calc_summ(my_list):
    summ = 0
    list_odd = []
    for i in range(0, len(my_list)):
        if i % 2 != 0:
            summ += my_list[i]
            list_odd.append(my_list[i])
    return [list_odd, summ]

number = digit_check("\nВведите целое положительное число элементов: ")
mass = [0]
mass = random_fill(number - 1)
print("Список из {} случайных чисел\n{}".format(number, mass))
print ("Сумма элементов на нечетных позицих {} равна {}".format(calc_summ(mass)[0], calc_summ(mass)[1]))

# ==============================================================

# Задача 2

# Напишите программу, которая найдёт произведение пар чисел списка. 
# Парой считаем первый и последний элемент, второй и предпоследний и т.д.
# Пример:
# - [2, 3, 4, 5, 6] => [12, 15, 16];
# - [2, 3, 5, 6] => [12, 15]

# Видимо, если количество элементов нечетное, средний умножается сам на себя

# Решение

from random import randint

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

def random_fill(number):    # Заполнение случайными числами
    for i in range(0, number):
        mass[i] = randint(0, number)
        mass.append(mass[i])
    return mass

def calc_mult(my_list):
    new_list = []
    list_of_pars = []
    max = int(len(my_list) / 2)
    for i in range(0, max):
        new_list.append(my_list[i] * my_list[(len(my_list) - 1) - i])
        list_of_pars.append((my_list[i], my_list[(len(my_list) - 1) - i]))
    if len(my_list) % 2 != 0:                                               # Если элементов нечетное колво, в конец добавляем квадрат среднего члена
        new_list.append(my_list[max] ** 2 ) 
        list_of_pars.append(my_list[max])
    return [new_list, list_of_pars]
        

number = digit_check("\nВведите целое положительное число элементов: ")
mass = [0]
mass = random_fill(number - 1)
print("\nСписок из {} случайных чисел:\n{}".format(number, mass))
print("\nСписок пар для умножения:\n{}".format(calc_mult(mass)[1]))
print("\nИтоговый список:\n{}".format(calc_mult(mass)[0]))

# Задача 3

# Задайте список из вещественных чисел. Напишите программу, которая найдёт разницу 
# между максимальным и минимальным значением дробной части элементов.
# Пример:
# - [1.1, 1.2, 3.1, 5, 10.01] => 0.19

# Решение

from random import random

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

def random_fill(number):    # Заполнение случайными числами
    for i in range(0, number):
        mass[i] = round((round(random(), 4) * 100), 2)     # 2 раза round потому что иногда получается вот такое: 0.2699999999999996
        mass.append(mass[i])
    return mass

def del_ostatok(my_list):               # Выделяем дробные части
    list_remain = []
    for i in range(0, len(my_list)):
       list_remain.append(round(my_list[i] % 1, 2))
    return list_remain

def calc_diff(my_list):                 # Находим большее и меньшее, вычисляем разницу
    max = min = my_list[0] 
    for i in range(1, len(my_list)):
        if my_list[i] > max: max = my_list[i]
        if my_list[i] < min: min = my_list[i]
    return [max, min, round((max - min), 2)]

number = digit_check("\nВведите целое положительное число элементов: ")
mass = [0]
mass = random_fill(number - 1)
print("\nСписок из {} случайных чисел:\n{}".format(number, mass))
print("\nСписок дробных частей:\n{}".format(del_ostatok(mass)))
result = calc_diff(del_ostatok(mass))
print('''\nРазница между 
максимальной дробной частью {} 
и минимальной {} 
равна: {}\n'''.format(result[0], result[1], result[2]))

# ===========================================================

# Задача 4

# Напишите программу, которая будет преобразовывать десятичное число в двоичное.
# Пример:
# - 45 -> 101101
# - 3 -> 11
# - 2 -> 10

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

number = digit_check("\nВведите десятичное число: ")
tmp_num = number

temp_str = ''
 
while number > 0:
    temp_str = str(number % 2) + temp_str
    number = number // 2
 
print("\nДесятичное число {} в двочной системе равно: {}\n".format(tmp_num, temp_str))

# ===================================================

# Задача 5
# Задайте число. Составьте список чисел Фибоначчи, в том числе для отрицательных индексов.
# Пример:
# - для k = 8 список будет выглядеть так: [-21 ,13, -8, 5, −3, 2, −1, 1, 0, 1, 1, 2, 3, 5, 8, 13, 21] 

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

def fibonacci(n):
    if n in range(0,3):
        return n
    elif n in range(3, n + 1):
        return fibonacci(n - 1) + fibonacci(n - 2)
    else: 
        return fibonacci(n + 2) - fibonacci(n + 1)


number = digit_check("\nВведите число: ")

fib = []
for i in range(-number, number + 1):
    fib.append(fibonacci(i))

print ("\nЧисла Фибоначчи для {}, включая отрицательные, равны:\n {}\n".format(number, fib))

# !!!!!! ХВОСТ - УРОК 4 ПЯТАЯ ЗАДАЧА   !!!!!!!!!!!!!!!!!!!!

# Даны два файла, в каждом из которых находится запись многочлена. 
# Задача - сформировать файл, содержащий сумму многочленов.

# Решение

def find_degree(term_list_item):                        # находим степень члена многочлена
    if term_list_item.find("^") != -1 :                 # Считаем с конца индекс первой ^ или *
        index = term_list_item.rfind("^")
    elif term_list_item.find("*") != -1 :
        index = term_list_item.rfind("*")
    elif term_list_item.find("x") != -1 :               # Если член первой степени
        return 1
    else : return 0                                     # Если коэффициент
    return int(term_list_item[index + 1:])

def find_koeff(item):                                   # ищем коэф. члена многочлена 
    if item.find("x") != -1 :
        index = item.find("x")                          # все, что до х
    else : 
        return item
    return item[0:index]

def summ_poly(p_1, p_2, max):                           # Складываем коэффициенты
    list_koef_1 = []
    list_koef_2 = []
    for i in range(max, -1, -1):                        # Формируем лист коэффициентов первого мнгчл
        count = 0
        for j in range(0, len(p_1)):
            if find_degree(p_1[j]) == i : 
                list_koef_1.append(find_koeff(p_1[j]))
                count += 1
        if count == 0 :                                 # Если элементов нет, коэффициент равен 0
            list_koef_1.append(0)
        
        count = 0                                       # То же для 2-го мнгчл
        for j in range(0, len(p_2)):
            if find_degree(p_2[j]) == i : 
                list_koef_2.append(find_koeff(p_2[j]))
                count += 1
        if count == 0 :
            list_koef_2.append(0)        

# Собираем вместе
    print ('\nКоэффициенты первого многочлена: \n', list_koef_1)
    print ('Коэффициенты второго многочлена: \n', list_koef_2)
    common_poly = ''                                                    # Формируем итоговую строку
    for i in range(0, max + 1):
        k = int(list_koef_1[i]) + int(list_koef_2[i])
        if k != 0 : 
            if i not in (max - 1, max) :
                common_poly += str(k) + 'x^' + str(max - i) + ' + '
            elif i == max - 1 :                                         # Для члена в 1й степени
                common_poly += str(k) + 'x'  + ' + '
            elif i == max:                                              # Для члена в 0й
                common_poly += str(k)
        else: common_poly += ''
    common_poly += ' = 0'
    return common_poly                                                  # Возвращаем итоговый многочлен

# Тело программы

with open("poly_1.txt", "r") as f:
    poly_1 = ((f.read()).rstrip(' = 0')).split(' + ')
f.close()

with open("poly_2.txt", "r") as f:
    poly_2 = ((f.read()).rstrip(' = 0')).split(' + ')
f.close()

print("\nПервый многочлен, разбитый по членам:\n",poly_1)
print("Второй многочлен, разбитый по членам:\n",poly_2)

degree_1 = find_degree(poly_1[0])                                               # Находим степень первого многочлена
degree_2 = find_degree(poly_2[0])                                               # и второго

if degree_1 > degree_2 : max_degree = degree_1                                  # Степень итогового многочлена
else : max_degree = degree_2

print("\nСумма двух многочленов:\n", summ_poly(poly_1, poly_2, max_degree))
print("")
