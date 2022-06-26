#include <stdio.h>
#include <string.h>

void abertura() {
  printf("*************************************\n");
  printf("*    Bem-vindo ao jogo da forca!    *\n");
  printf("*************************************\n\n");
}

void chuta(char chutes[26], int tentativas) {
  printf("\n");
  char chute;
  scanf(" %c", &chute); // precisa do espaço para não ler o enter
  
  chutes[tentativas] = chute;
}

int main() {
  char palavrasecreta[20];
  sprintf(palavrasecreta, "MELANCIA");
  
  int acertou = 0;
  int enforcou = 0;

  char chutes[26];
  int tentativas = 0;

  abertura();

  do {
    for (int i = 0; strlen(palavrasecreta) > i; i++) {
      int achou = 0;
      for (int j = 0; j < tentativas; j++) {
        if (chutes[j] == palavrasecreta[i]) {
          achou = 1;
          break;
        }
      }
      if (achou) {
        printf("%c ", palavrasecreta[i]);
      } else {
        printf("_ ");
      } 
    }
    
    chuta(chutes, tentativas);
    tentativas++;
  } while (!acertou && !enforcou);
}