import random

print("*********************************")
print("Bem vindo ao jogo de Adivinhação!")
print("*********************************")

secret_number = round(random.random() * 100)
tries = 3

for current_try in range(1, tries + 1):
    print(f"Tentativa {current_try} de {tries}")

    chute = int(input("Digite um número entre 1 e 100: "))
    bigger = chute == secret_number
    less = chute < secret_number

    if chute < 1 or chute > 100:
        print("Você deve dígitar um número entre 1 e 100")
        continue

    if bigger:
        print("Congratz, you won!")
        break
    elif less:
        print("Você errou, o número secreto é maior")
    else:
        print("Você errou, o número secreto é menor")

print("Fim de jogo")
