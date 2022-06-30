import random


def play():
    print("*********************************")
    print("***Bem vindo ao jogo da Forca!***")
    print("*********************************")

    palavra_secreta = "banana"

    enforcou = False
    acertou = False

    while (not enforcou and not acertou):
        chute = input("Qual letra? ")
        chute = chute.strip().lower()

        for (i, letra) in enumerate(palavra_secreta):
            if (chute == letra.lower()):
                print(f"Encontrei a letra {chute} na posição {i}")


if __name__ == "__main__":
    play()
