using Microsoft.AspNetCore.Mvc;
using App.Context;
using App.Models;
using Microsoft.EntityFrameworkCore;

namespace App.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class PaintingsController : ControllerBase
    {
        private readonly ApplicationContext _applicationContext;
        public PaintingsController(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Painting>>> GetPaintings()
        {
            if(_applicationContext == null ||  _applicationContext.PaintingsList == null)
            {
                return NotFound();
            }
            return await _applicationContext.PaintingsList.ToListAsync();
        }

        [HttpPut]
        public async Task<ActionResult<Painting>> AddPainting([FromBody] Painting painting)
        {
            if(_applicationContext == null || _applicationContext.PaintingsList == null)
            {
                return NotFound();
            }
            _applicationContext.PaintingsList.Add(painting);

            await _applicationContext.SaveChangesAsync();

            return painting;
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> RemovePainting([FromBody] int Id)
        {
            if(_applicationContext == null || _applicationContext.PaintingsList == null)
            {
                return NotFound();
            }

            Painting? paintingToRemove = _applicationContext.PaintingsList.Where(p => p.Id == Id).FirstOrDefault();

            if(paintingToRemove == null)
            {
                return false;
            }

            _applicationContext.PaintingsList.RemoveRange(paintingToRemove);
            await _applicationContext.SaveChangesAsync();

            return true;
        }
    }

