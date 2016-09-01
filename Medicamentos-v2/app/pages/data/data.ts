/**
 * Created by Javier Moreno on 1 ago 2016.
 */
import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from "@angular/core";
import {AnimationKeyframe} from "@angular/core/esm/src/animation/animation_keyframe";

export class Alarma {
  medicamento: string;
  cantidad: string;
  id: number;
  constructor(medicamento: string, cantidad: string, id: number) {
    this.medicamento = medicamento;
    this.cantidad = cantidad;
    this.id = id;
  }
}

@Injectable()
export class DataService{
  private storage;

  constructor(){
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS alarmas (id INTEGER PRIMARY KEY AUTOINCREMENT, medicamento TEXT, cantidad TEXT)');
  }

  // Get all notes of our DB
  public getAll() {
    return this.storage.query('SELECT * FROM alarmas');
  }

  // Get one notes of our DB
  public getOne(id) {
    return this.storage.query('SELECT * FROM alarmas WHERE id = \"'+id);
  }

  // Save a new note to the DB
  public save(alarma: Alarma) {
    let sql = 'INSERT INTO alarmas (medicamento, cantidad) VALUES (?,?)';
    return this.storage.query(sql, [alarma.medicamento, alarma.cantidad]);
  }

  // Update an existing note with a given ID
  public update(alarma: Alarma) {
    let sql = 'UPDATE notes SET medicamento = \"' + alarma.medicamento + '\", cantidad = \"' + alarma.cantidad + '\" WHERE id = \"' + alarma.id + '\"';
    this.storage.query(sql);
  }

  // Remoe a not with a given ID
  public remove(alarma: Alarma) {
    let sql = 'DELETE FROM notes WHERE id = \"' + alarma.id + '\"';
    this.storage.query(sql);
  }
}
