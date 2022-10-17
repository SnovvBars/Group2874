# 1. задача 3 из 2-го семинара
# Задайте список из n чисел, заполненный по формуле (1 + 1/n) ** n и вы ведите на экран их сумму

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


# Было :

# def f_culc(num):
#     return (1 + 1/num)**num

# number = digit_check("\nВведите целое положительное число: ")
# summ_lst = 0
# my_list = {}
# for i in range(1, number + 1):
#     my_list[i] = round(f_culc(i), 2)
#     summ_lst += my_list[i]
# print ('\nСумма списка \n{} \nиз {} элементов равна: \n{}\n'.format(my_list, number, summ_lst))

# Стало:

number = digit_check("\nВведите целое положительное число: ")

my_list = [x for x in range(1, number + 1)]
my_list = list(map(lambda x: round((1 + 1/x)**x, 2), my_list))

print ('\nСумма списка \n{} \nиз {} элементов равна: {}\n'.format(my_list, number, sum(my_list)))

# 2. задача 1 из 5-го семинара

# Напишите программу, удаляющую из текста все слова, содержащие ""абв"".

# Было:

# def del_string(string, sub_str):
#     string = string.split()
#     new_text = []
#     for elem in string:
#         if elem.find(sub_str) == -1:
#             new_text.append(elem)
#     new_text = ' '.join(new_text)
#     return new_text

# my_text = 'Съешь еще немного этих мягкихабв булочек и погуляй сабв собакойабв'
# print('\n' + my_text)
# print(del_string(my_text, 'абв') + '\n')

# Стало:

my_text = 'Съешь еще немного этих мягкихабв булочек и погуляй сабв собакойабв'
my_text = list(filter(lambda str: 'абв' not in str, my_text.split()))
my_text = ' '.join(my_text)
print('\n' + my_text  + '\n')

# 3 Из урока 4

# Дана последовательность чисел. Получить список уникальных 
# элементов заданной последовательности.
# Пример:
# [1, 2, 3, 5, 1, 5, 3, 10] => [2, 10]


a = [1, 2, 3, 5, 1, 5, 3, 10]

res = list(filter(lambda x: a.count(x)==1, a))    # Стало
# res = [x for x in a if a.count(x)==1]           # Было

print(res)

# 4 Задача 1 из 3 урока

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
    my_list = []
    for i in range(0, number):
        my_list.append(randint(0, 101))
    return my_list


# было

# def calc_summ(my_list):
#     summ = 0
#     list_odd = []
#     for i in range(0, len(my_list)):
#         if i % 2 != 0:
#             summ += my_list[i]
#             list_odd.append(my_list[i])
#     return [list_odd, summ]

# number = digit_check("\nВведите целое положительное число элементов: ")
# mass = [0]
# mass = random_fill(number - 1)
# print("Список из {} случайных чисел\n{}".format(number, mass))
# print ("Сумма элементов на нечетных позицих {} равна {}".format(calc_summ(mass)[0], calc_summ(mass)[1]))

# Стало

number = digit_check("\nВведите целое положительное число элементов: ")
mass = random_fill(number)
print("\nСписок из {} случайных чисел\n{}".format(number, mass))
mass = [x for x in mass if not mass.index(x)%2]                             # !!!!!!!!!!!!!!!!
print ("\nСумма элементов {} на нечетных позицих равна {}\n".format(mass, sum(mass)))
