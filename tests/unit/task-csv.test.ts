import {describe,it,expect} from 'vitest';
import {csvCell,tasksToCsv,CSV_HEADERS,CSV_FILENAME} from '../../src/lib/task-csv';
import type {TaskDTO} from '../../src/lib/task-logic';
describe('CSV',()=>{
 it.each([['a,b','"a,b"'],['a"b','"a""b"'],['a\nb','"a\nb"'],['a\r\nb','"a\r\nb"'],['',''],['日本語 😀','日本語 😀']])('escapes %j',(input,output)=>expect(csvCell(input)).toBe(output));
 it.each(['=1','+1','-1','@SUM(A1)',' \t\r\n=1','\0+1','\u0085-1','\u00a0@x'])('protects %j',input=>expect(csvCell(input).replaceAll('"','')).toBe("'"+input));
 it('has ordered headers and CRLF for an empty export',()=>expect(tasksToCsv([])).toBe(CSV_HEADERS.join(',')+'\r\n'));
 it('preserves supplied row order and count',()=>{
 const task={title:'Second',description:'',project:'Atlas',assignee:'Zoë',status:'Backlog',priority:'Low',dueDate:null,createdAt:'2026-01-01'} as TaskDTO;
 expect(tasksToCsv([task,{...task,title:'First'}])).toBe(CSV_HEADERS.join(',')+'\r\nSecond,,Atlas,Zoë,Backlog,Low,,2026-01-01\r\nFirst,,Atlas,Zoë,Backlog,Low,,2026-01-01\r\n');
 expect(CSV_FILENAME).toMatch(/^[a-z-]+\.csv$/);
 });
});
