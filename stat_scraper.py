
import fileinput 
#takes in a formatted txt file that has the attributes seperated by "|" characters and outputs it as
#sql commands
table={}
i=0
t=input("enter table name: ")
f=input("enter new file name: ")
s=input("enter source file name: ")
out=open(f, "w")
for line in fileinput.input(str(s)):
    s="INSERT INTO "+t+" VALUES ("
    l=line.split('|')
    for data in l[:-1]:
        s+=("\'"+data+"\', ")
    table[i]=(s[:-2]+");\n")
    i+=1

for value in table:
    out.write(str(table[value]))