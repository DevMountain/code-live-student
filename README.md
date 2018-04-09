# code-live - student
code-live is a tool used to help instructors sync their code live with their students. The student can then use those files being synced to compare against their own code to help prevent bugs/errors.

code-live will run a server in the background that listens for any changes that the instructor saved to their code. When changes occur, it will implement those changes.

## Installation
Using npm:

```

npm i -g code-live-student

```

## Usage
Navigate to the directory that will hold the instructor's syncing code and run:

```

code-live [ip address of instructor]

```

You will need to receive the ip address from the instructor and use it as an argument in the command line.

The code-live server will start running in the background on port 5000 and will receive any changes that were made by the instructor. 

When your code-live server connects to the instructor's code-live server, it will notify you in the terminal of the connection by printing to the terminal `code-live is connected`.

## Usage with VS Code
To code along with the instructor, simply create a new folder to store the instructor's code inside of your own code's directory. This will keep your code and the syncing instructor's code separate to prevent any overwrites. For example, a file structure with a react application would look something like this:

```
/node_modules
/public
/src
package.json
package-lock.json
README.md
.gitignore

/instructor-code
  |-- /public
  |-- /src
  |-- package.json
  |-- package-lock.json
  |-- README.md
```

Notice how the folder `instructor-code` contains a public and src folder along with some files. This would be the instructor code. Also, notice how there is no .gitignore or node_modules, these files will not be synced to your computer as they will be ignored on the instructor side.

When this file structure is set up, you can compare selected files using VS Code's compare functionality. Do so by selecting the instructor file you want to compare and then your file that you want to compare so that both are selected. *It's important that you select your file last, you are only able to edit the file that is selected last.* After doing this, right click on the last file selected to select the option `Compare Selected`. This will open both files in your editor and compare the differences between the two files. 

