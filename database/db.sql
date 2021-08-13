use anomalias_bgp;
CREATE TABLE cta_usuario(
	id  INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password varchar(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    primary key(id)
);
CREATE TABLE reporte_personal(
	id int(11) not null auto_increment,
    title VARCHAR(150) not null,
    observacion VARCHAR(255) not null,
    descripcion TEXT,
    id_usuario INT,
    created_at timestamp NOT null DEFAULT current_timestamp,
    primary key(id),
    constraint fk_user foreign key (id_usuario) references cta_usuario(id)
);

-- cta
INSERT INTO cta_usuario(username,password, fullname) values('acollaguzo',123,'adriana collaguazo');
INSERT INTO cta_usuario(username,password, fullname) values('gcast',456, 'Gustavo Castillo');
INSERT INTO cta_usuario(username,password, fullname) values('dzra',897, 'rosa sara');

-- reporte

use anomalias_bgp;
insert into reporte_personal(title,observacion,descripcion) values ('gestion','tabla de routeo', 'asignacion de rutas largas');
-- select *from reporte_personal;