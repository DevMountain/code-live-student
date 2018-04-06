## code-live - student
code-live is a tool used to help code instructors be able to live sync their code with their students. These live syncing files can be used to compare to the student's code and help prevent bugs/errors.
code-live will run a server in the background and watch the files in the directory that the command was executed. Any file or folder created, changed, moved or deleted will be synced with anyone who has connected to your code-live server.

## Installation
Using npm:

```

npm i -g code-live-student

```

## Usage
Navigate to the directory that will hold the instructor's code files and folders that will be synced and run:

```

code-live [ip address of instructor]

```

The code-live server will start running in the background on port 5000 and will receive any changes that were made by the instructor. 

When your code-live server connects to the instructor's code-live server, it will notify you in the terminal of the connection by printing to the terminal `code-live is connected`.

## Usage with VS Code
To code along with the instructor, simply create a new folder to store your own code. This will keep your code and the syncing instructor code separate to prevent any overwrites. For example, the file structure with a react application:

```
/public
/src
package.json
package-lock.json
README.md

/my-code
  |-- /node_modules
  |-- /public
  |-- /src
  |-- package.json
  |-- package-lock.json
  |-- README.md
  |-- .gitignore
```

Notice how the root of the folder contains a public and src folder along with some files. This would be the instructor code. Also notice how there is no .gitignore or node_modules, these files will not be synced to your computer.

When this file structure is set up, you can compare selected files using VS Code's compare functionality. Do so by selecting the instructor file you want to compare and then your file that you want to compare so that both are selected. *It's important that you select your file last, you are only able to edit a the file that selected last.* Once doing this, right click to select the option `Compare Selected`. This will open both files in your editor and compare between differences. 

