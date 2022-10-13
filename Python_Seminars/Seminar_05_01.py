# Задача 1
# Напишите программу, удаляющую из текста все слова, содержащие ""абв"".

# Рншение 1

def del_string(string, sub_str):
    string = string.split()
    new_text = []
    for elem in string:
        # print(i)
        if elem.find(sub_str) == -1:
            # print(elem.find('абв'))
            new_text.append(elem)
    new_text = ' '.join(new_text)
    return new_text

# file = open("text_01.txt")
# my_text = file.read()
# file.close()

my_text = 'Съешь еще немного этих мягкихабв булочек и погуляй сабв собакойабв'
print('\n' + my_text)

print(del_string(my_text, 'абв') + '\n')

# Рншение 2

# my_text = 'Съешь еще немного этих мягкихабв булочек и погуляй сабв собакойабв'
# my_text = list(filter(lambda str: 'абв' not in str, my_text.split()))
# my_text = ' '.join(my_text)
# print(my_text  + '\n')
