import random


def play():
    print("*********************************")
    print("Bem vindo ao jogo de Adivinhação!")
    print("*********************************")

    secret_number = random.randrange(1, 101)
    tries = 0
    initial_points = 1000
    points = initial_points

    print("Qual nível de dificuldade?")
    print("(1) Fácil (2) Médio (3) Difícil")

    level = int(input("Defina o nível: "))

    switch = {
        1: 10,
        2: 5,
        3: 3
    }

    tries = switch.get(level)
    if tries == None:
        print("level inválido, escolha 1, 2 ou 3!")
        exit()

    if level == 1:
        print("Você escolheu o nível Fácil")
    elif level == 2:
        print("Você escolheu o nível Médio")
    elif level == 3:
        print("Você escolheu o nível Difícil")

    for current_try in range(1, tries + 1):
        print(f"Tentativa {current_try} de {tries}")
        print(f'Pontuação: {points}/{initial_points}')

        chute = int(input("Digite um número entre 1 e 100: "))
        bigger = chute == secret_number
        less = chute < secret_number

        if chute < 1 or chute > 100:
            print("Você deve dígitar um número entre 1 e 100")
            continue

        if bigger:
            print("Congratz, you won!")
            print(f'Pontuação final: {points} pontos')
            break
        elif less:
            print("Você errou, o número secreto é maior")
        else:
            print("Você errou, o número secreto é menor")
        points = points - abs(secret_number - chute)

    print("Fim de jogo")
