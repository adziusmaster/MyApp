using Microsoft.AspNetCore.Mvc;
using App.Context;
using App.Models;
using Microsoft.EntityFrameworkCore;

namespace App.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class PaintingsController : ControllerBase
    {
        private readonly PaintingContext _paintingContext;
        public PaintingsController(PaintingContext paintingContext)
        {
            _paintingContext = paintingContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Painting>>> GetPaintings()
        {
            if(_paintingContext == null ||  _paintingContext.PaintingsList == null)
            {
                return NotFound();
            }
            return await _paintingContext.PaintingsList.ToListAsync();
        }

        [HttpPut]
        public async Task<ActionResult<Painting>> AddPainting([FromBody] Painting painting)
        {
            if(_paintingContext == null || _paintingContext.PaintingsList == null)
            {
                return NotFound();
            }
            _paintingContext.PaintingsList.Add(painting);

            await _paintingContext.SaveChangesAsync();

            return painting;
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> RemovePainting([FromBody] int Id)
        {
            if(_paintingContext == null || _paintingContext.PaintingsList == null)
            {
                return NotFound();
            }

            Painting? paintingToRemove = _paintingContext.PaintingsList.Where(p => p.Id == Id).FirstOrDefault();

            if(paintingToRemove == null)
            {
                return false;
            }

            _paintingContext.PaintingsList.RemoveRange(paintingToRemove);
            await _paintingContext.SaveChangesAsync();

            return true;
        }
    }

