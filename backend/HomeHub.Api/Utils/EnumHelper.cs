public static class EnumHelper
{
    public static List<EnumValue<TEnum>> GetAllEnumItems<TEnum>() where TEnum : Enum
    {
        return Enum.GetValues(typeof(TEnum))
            .Cast<TEnum>()
            .Select(e => new EnumValue<TEnum>
            {
                Value = e,
                Display = e.GetDescription()
            })
            .ToList();
    }
}
public sealed record EnumValue<TEnum> where TEnum : Enum
{
    public required TEnum Value { get; init; }
    public required string Display { get; init; }
}