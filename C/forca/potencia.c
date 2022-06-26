#include <stdio.h>

void potencia(int a, int b) {
  int result = 1;
  for (int i = 0; i < b; i++) {
    result *= a;
  }

  printf("%d\n", result);
}

int main() {
  printf("Calcular potencia de 2^10\n");

  potencia(2, 10);
}