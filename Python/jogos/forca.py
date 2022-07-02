import random


def play():
    print("*********************************")
    print("***Bem vindo ao jogo da Forca!***")
    print("*********************************")

    palavra_secreta = "banana"
    letras_acertadas = ["_", "_", "_", "_", "_", "_"]

    enforcou = False
    acertou = False

    print(f"{' '.join(letras_acertadas)}")

    while (not enforcou and not acertou):
        chute = input("Qual letra? ")
        chute = chute.strip().upper()

        for (i, letra) in enumerate(palavra_secreta):
            if (chute == letra.upper()):
                letras_acertadas[i] = letra.upper()

        print(f"{' '.join(letras_acertadas)}")


if __name__ == "__main__":
    play()
