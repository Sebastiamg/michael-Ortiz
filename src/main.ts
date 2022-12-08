import { Student } from "./entities/student";
import { Teacher } from "./entities/teacher";
import { gradeBookSetup } from "./entities/gradeBookSetup";

// Empty Array Interfaces creation
let students: Student[] = [];
let teachers: Teacher[] = [];
let gradeBooks: gradeBookSetup[] = [];
let SummayGrades: any[] = [];

// Event in every forms
[...document.forms].forEach( (form: HTMLFormElement): void => {
    // Submit Event in a Form
    form.addEventListener("submit", (e): void => { 
        e.preventDefault();
        // Form data interface name and empty Object
        let dataInterface = (e.target as HTMLFormElement).dataset.interface;
        let newObj: any = {};
        // Object creation with diferent data types
        for (let i = 0; i < form.length - 1; i++) {
            let htmlInput = form[i] as HTMLInputElement;
            (/^[0-9]+$/).test(htmlInput.value) ?
                newObj[htmlInput.name] = parseInt(htmlInput.value) :
                newObj[htmlInput.name] = htmlInput.value;   
        }
        // Obj in his respective array
        switch (dataInterface) {
            case "Student":
                newObj as Student;
                students.push(newObj);
                console.log(students);
                createOptionElm({[`${newObj.fullname}`]: newObj.fullname}, "student");
                break;
            case "Teacher":
                newObj as Teacher;
                teachers.push(newObj);
                console.log(teachers);
                createOptionElm({[`${newObj.fullname}`]: newObj.fullname}, "teacher");
                break;
            case "GradeBookSetup":
                newObj as gradeBookSetup;
                gradeBooks.push(newObj);
                console.log(gradeBooks);
                createOptionElm({[`${newObj.course}`]: newObj.course}, "course1", 
                    createOptionElm({[`${newObj.activity}`]: newObj.activity}, "activity3"));
                fullSummaryGrd("mgrade", newObj.maxGrade);
                showStatus("mgrade");
                break;
            case "SummayGrades":
                SummayGrades.push(newObj);
                // console.table(SummayGrades);
                showStatus("mgrade");
                createTableData(newObj, showStatus("mgrade"))
                break;
            default:
                break;
        }
    });
});

// Option element creation whit enums
enum course {
    visualProgramation = "Programación Visual",
    interfaceDesign = "Diseño de Interfaces",
    dataBase = "Base de datos"
}

function createOptionElm(optionArr: unknown, selectName: string, recursividad?: any): void {
    (Object.entries((optionArr as object))).forEach( optionArrEntrie => {
        const option = document.createElement("OPTION") as HTMLOptionElement;
        option.value = optionArrEntrie[1];
        option.textContent = optionArrEntrie[1];
        document.querySelector(`#${selectName}`)!.append(option);
    })
};

//createOptionElm(course, "course");

// option generation in select tags
document.querySelectorAll(".submitAct")!.forEach( (x): void => x.addEventListener("click", (e): void => {
    let selectTarget: unknown = ((e.target) as HTMLElement)!.dataset.opttarget;
    const tempArr: string[] = [];
    
    const value = (((e.target) as HTMLElement).previousElementSibling!.children[0] as HTMLInputElement).value;

    tempArr.push(value);

    createOptionElm(tempArr, selectTarget as string);
}));

// Fill Summay Grade
function fullSummaryGrd(inputName: string, inputValue: string, recursividad?: unknown): any {
    (document.querySelector(`#${inputName}`) as HTMLInputElement).value = inputValue;
};

//Status
function showStatus(inputName: string): string {
    const inputValue = (document.querySelector(`#${inputName}`) as HTMLInputElement);
    if (parseInt(inputValue.value) > 70) {
        (inputValue)!.classList.replace("outline-red-600", "outline-lime-600");
        (inputValue)!.classList.add("outline", "outline-lime-600");
        (inputValue.parentElement?.nextElementSibling!).textContent = "Aprobado";
        return "Aprobado"
    } else {
        (inputValue)!.classList.replace("outline-lime-600", "outline-red-600");
        (inputValue)!.classList.add("outline", "outline-red-600");
        (inputValue.parentElement?.nextElementSibling!).textContent = "Reprobado";
        return "Reprobado"
    }
};

function createTableData(obj: unknown, grade: string): void {
    const tableBody = ((document.querySelector("#table") as HTMLTableElement).lastElementChild as HTMLElement);
    const tr = document.createElement("TR") as HTMLElement;
    for (let i = 0, objValue = Object.entries(obj as object); i < Object.keys(obj as object).length; i++) {
        let td = document.createElement("TD") as HTMLElement;
        td.textContent = objValue[i][1];
        td.classList.add("px-5", "border-2", "border-slate-900")
        tr.append(td);
        console.log(grade);
    };

    let td = document.createElement("TD") as HTMLElement;
    td.textContent = grade;
    td.classList.add("px-5", "border-2", "border-slate-900");
    tr.append(td);

    grade === "Aprobado" ?
    td.classList.add("bg-green-900") :
    td.classList.add("bg-red-900"); 


    tableBody.append(tr);
};