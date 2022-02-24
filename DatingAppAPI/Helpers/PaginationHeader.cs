namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int Totalitems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int CurrentPage, int ItemsPerPage, int Totalitems, int Totalpages)
        {
            this.CurrentPage = CurrentPage;
            this.ItemsPerPage = ItemsPerPage;
            this.TotalPages = Totalpages;
            this.Totalitems = Totalitems;
        }
    }
}