namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Transfer
    {
        public int Id { get; set; }
        public double Amount {  get; set; }
        public string Note {  get; set; }
        public DateTime CreatedAt { get; set; }
        public short CurrencyId {  get; set; }
        public Currency Currency { get; set; }
        public int FromUserId {  get; set; }
        public User FromUser {  get; set; }
        public int ToUserId {  get; set; }
        public User ToUser {  get; set; }
        
    }
}
