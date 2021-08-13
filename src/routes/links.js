const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add' , (req,res)=>{
    res.render('links/add');
});

router.post('/add',async(req,res)=>{
    const {title,observacion,descripcion}= req.body;
    const newObservation = {
        title,
        observacion,
        descripcion
    };
    await pool.query('INSERT INTO reporte_personal set ?',[newObservation]);
    req.flash('success', 'report saved successfully');
    //console.log(await pool.query('select * from reporte_personal'));
    //console.log(newObservation);
    res.redirect('/links');
});

router.get('/', async (req,res) =>{
    const reportes = await pool.query('select * from reporte_personal');
    res.render('links/list',{ reportes });
});

router.get('/delete/:id',async (req,res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM reporte_personal WHERE ID = ?', [id]);
    req.flash('success', 'report Deleted successfully');
    res.redirect('/links');
    
});

router.get('/edit/:id',async (req,res)=>{
    const { id } = req.params;
    const reportes =await pool.query('SELECT * FROM reporte_personal WHERE ID= ?',[id]);
    console.log(reportes[0]);
    res.render('links/edit',{ reporte: reportes[0] });
});

router.post('/edit/:id',async(req,res)=>{
    const { id } = req.params;
    const {title, observacion, descripcion }= req.body;
    const newreport  = {
        title,
        observacion,
        descripcion
    };
    console.log(newreport);
    await pool.query('UPDATE reporte_personal set ? WHERE id = ?',[newreport,id]);
    res.redirect('/links');
});
module.exports = router;