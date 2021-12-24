

clc
clear
file = fopen('sample.txt');
t = fscanf(file, '%c');
str = char(t);
l = length(str);
conso = 0;
for
  i = 1: l
  if str (i) ~ = 'a' && str(i) ~ = 'e' && str(i) ~ = 'i' && str(i) ~ = 'o' &&
      str(i) ~ = 'u' && str(i) ~ = 'A' && str(i) ~ = 'E' && str(i) ~ = 'I' &&
      str(i) ~ = 'O' && str(i) ~ = 'U'
  conso = conso + 1;
end
end
fprintf('Consonants: %d\n', conso);
fclose(file);s
