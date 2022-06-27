#include <stdio.h>
#include <string.h>

// variáveis globais
char palavrasecreta[20];
char chutes[26]; // por natureza o array é um ponteiro que aponta para o primeiro elemento do array
int chutesdados = 0;

void abertura() {
  printf("*************************************\n");
  printf("*    Bem-vindo ao jogo da forca!    *\n");
  printf("*************************************\n\n");
}

void chuta() {
  printf("\n");
  char chute;
  scanf(" %c", &chute); // precisa do espaço para não ler o enter
  chutes[chutesdados] = chute;
  chutesdados++;
}

int jachutou(char letra) {
  int achou = 0;
  for (int j = 0; j < chutesdados; j++) {
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

int acertou() {
  for(int i = 0; strlen(palavrasecreta) > i; i++) {
    if (!jachutou(palavrasecreta[i])) return 0;
  }
  return 1;
}

int enforcou() {
  int erros = 0;
  for (int i = 0; chutesdados > i; i++) {
    if (!jachutou(palavrasecreta[i])) erros++;
  }
  return erros >= 5;
}

int main() {
  abertura();
  escolhepalavra();
  do {
    desenhaforca();
    chuta();
  } while (!acertou() && !enforcou());
}