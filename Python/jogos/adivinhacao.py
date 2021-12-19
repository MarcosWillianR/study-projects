print("*********************************")
print("Bem vindo ao jogo de Adivinhação!")
print("*********************************")

secret_number = 42

tries = 3
current_try = 1

while current_try <= tries:
    print(f"Tentativa {current_try} de {tries}")

    chute = int(input("Digite o seu número: "))
    bigger = chute == secret_number
    less = chute < secret_number

    if bigger:
        print("Congratz, you won!")
        break
    elif less:
        print("Você errou, o número secreto é maior")
    else:
        print("Você errou, o número secreto é menor")

    current_try += 1

print("Fim de jogo")
