# Nova Conta Digital Dock

# Requisitos
- Deve ser possível criar e remover portadores [x] (desativo ao invés de remover)
    - Um portador deve conter apenas seu nome completo e CPF [x]
    - O CPF deve ser válido e único no cadastro de portadores [x]

- As contas digital Dock devem conter as seguintes funcionalidades:
    - A conta deve ser criada utilizando o CPF do portador [x]
    - Uma conta deve ter seu saldo, número e agência disponíveis para consulta [x]
    - Necessário ter funcionalidade para fazer a consulta de extrato da conta por período [x]
    - Um portador pode fechar a conta digital Dock a qualquer instante [x]
    - Executar as operações de saque e depósito:
        - Depósito é liberado para todas as contas ativas e desbloqueadas [x]
        - Saque é permitido para todas as contas ativas e desbloqueadas desde que haja saldo disponível e não ultrapasse o limite diário de 2 mil reais [x]

- Precisamos bloquear e desbloquear a conta digital Dock a qualquer momento [x]
- A conta digital Dock nunca poderá ter o saldo negativo