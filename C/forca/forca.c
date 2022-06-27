#include <stdio.h>
#include <string.h>

// variáveis globais
char palavrasecreta[20];
char chutes[26]; // por natureza o array é um ponteiro que aponta para o primeiro elemento do array
int tentativas = 0;

void abertura() {
  printf("*************************************\n");
  printf("*    Bem-vindo ao jogo da forca!    *\n");
  printf("*************************************\n\n");
}

void chuta() {
  printf("\n");
  char chute;
  scanf(" %c", &chute); // precisa do espaço para não ler o enter
  chutes[tentativas] = chute;
  tentativas++;
}

int jachutou(char letra) {
  int achou = 0;
  for (int j = 0; j < tentativas; j++) {
    if (chutes[j] == letra) {
      achou = 1;
      break;
    }
  }
  return achou;
}

void desenhaforca() {
  for (int i = 0; strlen(palavrasecreta) > i; i++) {
    int achou = jachutou(palavrasecreta[i]);
    if (achou) {
      printf("%c ", palavrasecreta[i]);
    } else {
      printf("_ ");
    }
  }
}

void escolhepalavra() {
  sprintf(palavrasecreta, "MELANCIA");
}

int enforcou() {
  int erros = 0;
  for (int i = 0; i < tentativas; i++) {
    int existe = 0;
    for (int j = 0; strlen(palavrasecreta) > j; j++) {
      if (chutes[i] == palavrasecreta[j]) {
        existe = 1;
        break;
      }
    }
    if (!existe) erros++;
  }
  return erros >= 5;
}

int main() {
  int acertou = 0;
  abertura();
  escolhepalavra();
  do {
    desenhaforca();
    chuta();
  } while (!acertou && !enforcou());
}